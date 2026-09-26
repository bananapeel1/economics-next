/**
 * Edexcel IAL Economics and Business exam timetables, copied from Pearson's FINAL timetable PDFs.
 * Re-check against the source before each series: Pearson can amend a final timetable.
 */

export const jan2027 = {
  series: 'January 2027',
  status: 'FINAL',
  source: 'https://qualifications.pearson.com/content/dam/pdf/Support/Examination-timetables-for-International-Advanced-Levels/ial-january-2027-final.pdf',
  checked: '2026-09-26',
  papers: [
    { code: 'WBS11', subject: 'Business', unit: 1, title: 'Marketing and People', date: '2027-01-11', day: 'Mon 11 Jan', session: 'Morning', length: '2h' },
    { code: 'WEC11', subject: 'Economics', unit: 1, title: 'Markets in Action', date: '2027-01-11', day: 'Mon 11 Jan', session: 'Afternoon', length: '1h 45m' },
    { code: 'WEC12', subject: 'Economics', unit: 2, title: 'Macroeconomic Performance and Policy', date: '2027-01-13', day: 'Wed 13 Jan', session: 'Morning', length: '1h 45m' },
    { code: 'WBS12', subject: 'Business', unit: 2, title: 'Managing Business Activities', date: '2027-01-15', day: 'Fri 15 Jan', session: 'Morning', length: '2h' },
    { code: 'WEC13', subject: 'Economics', unit: 3, title: 'Business Behaviour', date: '2027-01-15', day: 'Fri 15 Jan', session: 'Morning', length: '2h' },
    { code: 'WBS13', subject: 'Business', unit: 3, title: 'Business Decisions and Strategy', date: '2027-01-18', day: 'Mon 18 Jan', session: 'Morning', length: '2h' },
    { code: 'WEC14', subject: 'Economics', unit: 4, title: 'Developments in the Global Economy', date: '2027-01-20', day: 'Wed 20 Jan', session: 'Afternoon', length: '2h' },
    { code: 'WBS14', subject: 'Business', unit: 4, title: 'Global Business', date: '2027-01-21', day: 'Thu 21 Jan', session: 'Morning', length: '2h' },
  ],
};

export const oct2026 = {
  series: 'October 2026',
  status: 'FINAL',
  source: 'https://qualifications.pearson.com/content/dam/pdf/Support/Examination-timetables-for-International-Advanced-Levels/ial-october2026-final.pdf',
  checked: '2026-09-26',
  papers: [
    { code: 'WBS11', subject: 'Business', unit: 1, title: 'Marketing and People', date: '2026-10-08', day: 'Thu 8 Oct', session: 'Morning', length: '2h' },
    { code: 'WEC11', subject: 'Economics', unit: 1, title: 'Markets in Action', date: '2026-10-12', day: 'Mon 12 Oct', session: 'Morning', length: '1h 45m' },
    { code: 'WBS12', subject: 'Business', unit: 2, title: 'Managing Business Activities', date: '2026-10-14', day: 'Wed 14 Oct', session: 'Morning', length: '2h' },
    { code: 'WEC12', subject: 'Economics', unit: 2, title: 'Macroeconomic Performance and Policy', date: '2026-10-16', day: 'Fri 16 Oct', session: 'Morning', length: '1h 45m' },
    { code: 'WBS13', subject: 'Business', unit: 3, title: 'Business Decisions and Strategy', date: '2026-10-20', day: 'Tue 20 Oct', session: 'Morning', length: '2h' },
    { code: 'WEC13', subject: 'Economics', unit: 3, title: 'Business Behaviour', date: '2026-10-23', day: 'Fri 23 Oct', session: 'Afternoon', length: '2h' },
    { code: 'WBS14', subject: 'Business', unit: 4, title: 'Global Business', date: '2026-10-27', day: 'Tue 27 Oct', session: 'Morning', length: '2h' },
    { code: 'WEC14', subject: 'Economics', unit: 4, title: 'Developments in the Global Economy', date: '2026-10-30', day: 'Fri 30 Oct', session: 'Morning', length: '2h' },
  ],
};

/** Pearson's key-dates page (checked 2026-09-26) lists January 2026 results, not yet January 2027. */
export const lastJanuaryResults = { series: 'January 2026', students: '19 March 2026' };
