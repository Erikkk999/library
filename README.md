# Library

A simple, interactive library app built with HTML, CSS, and JavaScript. You can add books to your personal library, track your reading progress, and remove books when they're no longer needed.

## Features

- **Add books** - Add a book's title, author, and page count through a form.
- **View your library** - Display each book in an individual card.
- **Track reading progress** - Toggle a book's status between Read and Not read.
- **Remove books** - Delete books from your library.
- **Interactive UI** - Custom switches, animated buttons, hover effects, and transitions.
- **Form validation** - Use HTML form validation to help ensure valid input.

## Tech Stack

- HTML
- CSS
- JavaScript

## Implementation Highlights

- Uses constructor functions and prototypes to represent books.
- Generates unique book IDs with crypto.randomUUID().
- Dynamically creates book cards using the DOM API.
- Uses event delegation to handle reading-status changes and book removal.
- Uses CSS custom properties for consistent colors and styling.
- Includes custom fonts, responsive sizing, and CSS transitions.

### Data Storage

Books are stored in a JavaScript array in memory. The library is not persisted, so your books will be lost when the page is reloaded.
