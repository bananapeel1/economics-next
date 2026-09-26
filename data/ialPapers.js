/**
 * Structure of each Edexcel IAL Economics and Business paper, from the specifications' unit overviews:
 * Economics Issue 2 (June 2018) and Business Issue 1 (Sept 2017); extracted text in audit/raw/econ_spec.txt
 * and audit/raw/bus_spec.txt. Every paper is 80 marks and is available in January, June and October.
 */

const ECON_AS = {
  length: '1 hour 45 minutes',
  sections: [
    ['A', 'Six multiple-choice questions', 6],
    ['B', 'Five short-answer questions', 20],
    ['C', 'A five-part question on data in a source booklet', 34],
    ['D', 'One 20-mark essay, from a choice of two', 20],
  ],
};
const ECON_A2 = {
  length: '2 hours',
  sections: [
    ['A', 'Six multiple-choice questions', 6],
    ['B', 'A five-part question on data in a source booklet', 34],
    ['C', 'Two 20-mark essays, from a choice of three', 40],
  ],
};
const BUS_AS = {
  length: '2 hours',
  sections: [
    ['A', 'Short and extended-response questions based on sources', 30],
    ['B', 'The same format, based on different sources', 30],
    ['C', 'One 20-mark essay based on one or more sources', 20],
  ],
};
const BUS_A2 = {
  length: '2 hours',
  sections: [
    ['A', 'Short and extended-response questions based on sources', 40],
    ['B', 'One 20-mark essay based on one or more sources', 20],
    ['C', 'One 20-mark essay based on one or more sources', 20],
  ],
};

export const IAL_PAPERS = {
  WEC11: ECON_AS, WEC12: ECON_AS, WEC13: ECON_A2, WEC14: ECON_A2,
  WBS11: BUS_AS, WBS12: BUS_AS, WBS13: BUS_A2, WBS14: BUS_A2,
};
