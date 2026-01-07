// MongoDB initialization script
// This runs automatically when the container starts for the first time

// Create user in the admin database for authentication
db = db.getSiblingDB('ltcdb');

db.createUser({
  user: 'ltcuser',
  pwd: 'ltcpass',
  roles: [
    {
      role: 'dbOwner',
      db: 'ltcdb'
    }
  ]
});

db.createCollection('sampleCollection');

print('Initialization complete: User "ltcuser" created and sample collection setup.');
