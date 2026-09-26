-- Ad-hoc reads for the Supabase SQL editor. Nothing in the app runs these.

-- 1. "How useful was this topic?", worst first. Fewer than 8 answers is noise, so it is left out.
SELECT f.section_id, s.number AS spec, count(*) AS answers,
       round(avg(f.rating), 2) AS average,
       round(avg((f.rating <= 2)::int), 2) AS share_low
  FROM user_feedback f
  LEFT JOIN sections s ON s.id = f.section_id
 WHERE f.moment = 'section_complete' AND f.created_at > now() - interval '90 days'
 GROUP BY 1, 2
HAVING count(*) >= 8
 ORDER BY average;

-- 2. How long a reported problem stays live, by severity.
SELECT severity, count(*) AS fixed,
       percentile_cont(0.5) WITHIN GROUP (ORDER BY status_changed_at - created_at) AS median_time_to_fix
  FROM content_issues
 WHERE status = 'resolved' AND created_at > now() - interval '90 days'
 GROUP BY severity
 ORDER BY min(severity_rank);

-- 3. Reports per 100 Learn Mode opens, by section: where students trip, adjusted for traffic.
WITH r AS (SELECT ci.section_id, count(*) AS reports
             FROM content_reports cr JOIN content_issues ci ON ci.id = cr.issue_id
            WHERE cr.created_at > now() - interval '30 days' GROUP BY 1),
     o AS (SELECT section_id, count(*) AS opens
             FROM app_events WHERE event = 'learn_open' AND created_at > now() - interval '30 days' GROUP BY 1)
SELECT r.section_id, r.reports, o.opens, round(100.0 * r.reports / nullif(o.opens, 0), 1) AS per_100_opens
  FROM r LEFT JOIN o USING (section_id)
 ORDER BY per_100_opens DESC NULLS LAST;

-- 4. Is the card worth its interruption? Shown vs answered vs waved away, last 30 days.
SELECT count(*) FILTER (WHERE event = 'feedback_prompt_shown')                          AS shown,
       count(*) FILTER (WHERE event = 'feedback_sent' AND props->>'source' = 'moment')  AS answered,
       count(*) FILTER (WHERE event = 'feedback_prompt_dismissed')                      AS dismissed,
       count(*) FILTER (WHERE event = 'feedback_prompt_ignored')                        AS ignored
  FROM app_events
 WHERE created_at > now() - interval '30 days';
