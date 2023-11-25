import React, { useState, useEffect } from 'react';
import Layout from '@layouts/Default';

// Define a type for the book object with all the expected properties.
type Book = {
  Title: string;
  Category: string;
  Price: string;
  Price_After_Tax: string;
  Tax_amount: string;
  Availability: string;
  Number_of_reviews: string;
  Book_Description: string;
  Image_Link: string;
  Stars: string;
};
// Custom CSV parsing function that accounts for quoted fields
const parseCSV = (csvString: string): Book[] => {
  const lines = csvString.split('\n');
  const headers = lines[0].split(',').map((header) => header.trim());
  const data: Book[] = lines.slice(1).map((line) => {
    const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    return headers.reduce((obj: any, header, index) => {
      obj[header] = values[index]?.replace(/^"(.+)"$/, '$1').trim();
      return obj;
    }, {} as Book);
  });
  return data.filter((book) => book.Title); // Filter out any empty rows
};

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch('/data/Book_Dataset_1.csv');
        const csvString = await response.text();
        const parsedData = parseCSV(csvString);
        setBooks(parsedData);
      } catch (error) {
        console.error('Error fetching or parsing CSV', error);
      }
    };

    fetchCSV();
  }, []);

  return (
    <Layout>
      <h1>Books</h1>
      <div>
        {books.map((book, index) => (
          <div key={index}>
            <h2>{book.Title}</h2>
            <p>{book.Category}</p>
            <p>Price: {book.Price}</p>
            <p>Stars: {book.Stars}</p>
            <p>Description: {book.Book_Description && book.Book_Description.length > 300 ? `${book.Book_Description.slice(0, 300)}...` : book.Book_Description}</p>
            <br /> {/* Line break to create space */}
          </div>
        ))}
      </div>
    </Layout>
  );
}
