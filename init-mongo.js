print('Start #################################################################');

db = db.getSiblingDB('admin');
db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [ { role: "root", db: "admin" } ]
  }
)

db = db.getSiblingDB('us');
db.createUser({
  user: 'urlshortener',
  pwd: 'urlshortener',
  roles: [{ role: 'readWrite', db: 'us' }],
});

print('END #################################################################');
