function highlightText() {
  const body = DocumentApp.getActiveDocument().getBody();

  // Regular expression to match standalone English words or specific standalone Bengali words
  const regex = /\b[a-zA-Z]+\b|(?<!\S)(এ|এর|টা|টি|তে)(?!\S)/g;

  // Loop through all paragraphs in the document
  const paragraphs = body.getParagraphs();

  paragraphs.forEach(paragraph => {
    const text = paragraph.getText();
    const matches = text.match(regex);

    if (matches) {
      let startOffset = 0;

      // Clear any previous highlights in the paragraph
      paragraph.setBackgroundColor(null);

      matches.forEach(match => {
        // Find the start index of the match
        const startIndex = text.indexOf(match, startOffset);
        const endIndex = startIndex + match.length; // Adjust endIndex to be exclusive

        // Set background color for the matched text
        const rangeElement = paragraph.editAsText();
        rangeElement.setBackgroundColor(startIndex, endIndex - 1, '#FFFF00'); // Yellow highlight

        // Update the startOffset to the end of the current match
        startOffset = startIndex + match.length; // Update to the position after the current match
      });
    }
  });

  DocumentApp.getActiveDocument().saveAndClose(); // Save changes
}