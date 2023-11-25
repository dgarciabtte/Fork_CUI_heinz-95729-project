import express from 'express';
import Datastore from 'nedb';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// Database setup
const database = new Datastore({ filename: 'database.db', autoload: true });

// Middleware
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Define __dirname in ES module scope
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/books', (req, res) => {
  database.find({}, (err, docs) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // Transform the data to match the VolumeInfo structure
      const transformedBooks = docs.map(doc => {
        return {
          id: doc.id, // or doc._id if NeDB uses _id
          volumeInfo: {
            title: doc.volumeInfo.title,
            subtitle: doc.volumeInfo.subtitle,
            authors: doc.volumeInfo.authors,
            publishedDate: doc.volumeInfo.publishedDate,
            description: doc.volumeInfo.description,
            averageRating: doc.volumeInfo.averageRating,
            categories: doc.volumeInfo.categories,
            imageLinks: {
              smallThumbnail: doc.volumeInfo.imageLinks.smallThumbnail,
              thumbnail: doc.volumeInfo.imageLinks.thumbnail
            },
            // Add other properties from volumeInfo as needed
          },
          // Add other top-level properties as needed
        };
      });
      res.json(transformedBooks);
    }
  });
});

// Listen on port 3000
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
