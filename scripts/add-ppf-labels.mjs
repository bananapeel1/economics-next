import { createClient } from '@supabase/supabase-js';

const s = createClient(
  process.env.SUPABASE_URL,
  'process.env.SUPABASE_SERVICE_KEY'
);

// Labels for each point on the PPF
const pointLabels = {
  'A': { desc: 'All consumer goods', dx: -10, dy: 20 },
  'B': { desc: 'All capital goods', dx: 20, dy: -5 },
  'C': { desc: 'Efficient (on PPF)', dx: 30, dy: -5 },
  'D': { desc: 'Efficient (on PPF)', dx: 20, dy: 20 },
  'E': { desc: 'Inefficient (inside)', dx: 20, dy: 20 },
  'F': { desc: 'Unattainable (outside)', dx: 20, dy: -5 },
};

function addLabelsToSvg(svg) {
  // For each point letter, find its text element and add a description nearby
  let modified = svg;

  for (const [letter, { desc, dx, dy }] of Object.entries(pointLabels)) {
    // Find the text element for this letter
    const regex = new RegExp(`(<text[^>]*x="([^"]+)"[^>]*y="([^"]+)"[^>]*>\\s*${letter}\\s*<\\/text>)`);
    const match = modified.match(regex);

    if (match) {
      const x = parseFloat(match[2]) + dx;
      const y = parseFloat(match[3]) + dy;
      const labelText = `<text x="${x}" y="${y}" fill="#7a8299" font-size="9" font-family="DM Sans, sans-serif" font-weight="400">${desc}</text>`;
      // Insert the label right after the letter text element
      modified = modified.replace(match[0], match[0] + '\n' + labelText);
    }
  }

  return modified;
}

async function run() {
  const { data } = await s.from('section_diagrams').select('data').eq('section_id', 'introductory-concepts').single();
  const diagrams = data?.data;
  if (!diagrams) { console.log('No diagrams'); return; }

  const ppf = diagrams[0];
  console.log('Adding labels to PPF diagram...');
  console.log('Scenarios:', ppf.scenarios.length);

  // Add labels to each scenario's SVG
  ppf.scenarios = ppf.scenarios.map(scenario => ({
    ...scenario,
    svg: addLabelsToSvg(scenario.svg),
  }));

  // Update in database
  const { error } = await s.from('section_diagrams').update({ data: diagrams }).eq('section_id', 'introductory-concepts');

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('PPF labels added successfully');
    // Verify
    ppf.scenarios.forEach((sc, i) => {
      const labels = sc.svg.match(/font-size="9"/g) || [];
      console.log('  ' + sc.label + ': ' + labels.length + ' description labels added');
    });
  }
}

run();
