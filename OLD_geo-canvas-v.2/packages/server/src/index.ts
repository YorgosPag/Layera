import express from 'express';
import cors from 'cors';
import { ImportedLayer } from '@geo-platform/shared';

const app = express();
const port = 3001; // Running on a different port than the frontend

// Middleware
// Allow all origins for development purposes. This fixes the CORS issue.
app.use(cors());
app.use(express.json()); // Allow the server to understand JSON

// Mock data for now, to be replaced by a database later
const mockListings: any[] = [
  {
    id: 'server-layer-1',
    name: 'Server: Πώληση Διαμερίσματος (Mock)',
    type: 'geometry',
    data: null,
    bounds: {
        _southWest: { lat: 37.97, lng: 23.72 },
        _northEast: { lat: 37.98, lng: 23.73 }
    },
    isVisible: true,
    opacity: 1,
    category: 'property',
    intent: 'offer',
    transactionType: 'sale',
    createdAt: new Date().toISOString(),
    details: {
        price: 180000,
        area: 95,
    }
  },
  {
    id: 'server-layer-2',
    name: 'Server: Αναζήτηση Εργασίας (Mock)',
    type: 'geometry',
    data: null,
    bounds: {
        _southWest: { lat: 40.63, lng: 22.94 },
        _northEast: { lat: 40.64, lng: 22.95 }
    },
    isVisible: true,
    opacity: 1,
    category: 'job',
    intent: 'search',
    employmentType: 'full_time',
    createdAt: new Date().toISOString(),
    details: {
        jobTitle: 'Frontend Developer',
    }
  }
];


// A simple test route
app.get('/', (req, res) => {
  res.send('Geo-Platform Server is running!');
});

// The first real API endpoint to serve listings
app.get('/api/listings', (req, res) => {
  console.log('GET /api/listings request received');
  res.json(mockListings);
});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});