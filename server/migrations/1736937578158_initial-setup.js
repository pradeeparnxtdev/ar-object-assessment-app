exports.up = (pgm) => {
    pgm.createTable('users', {
      id: 'id',
      name: { type: 'varchar(100)', notNull: true },
      username: { type: 'varchar(100)', notNull: true, unique: true },
      password: { type: 'varchar(255)', notNull: true },
      role: { type: 'varchar(50)', notNull: true },
      created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    });
  
    pgm.createTable('objects', {
      id: 'id',
      name: { type: 'varchar(100)', notNull: true },
      url: { type: 'varchar(255)', notNull: true },
      created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    });
  
    pgm.createTable('visits', {
      id: 'id',
      user_id: { type: 'integer', notNull: true, references: 'users', onDelete: 'CASCADE' },
      object_id: { type: 'integer', notNull: true, references: 'objects', onDelete: 'CASCADE' },
      count: { type: 'integer', notNull: true, default: 0 },
      created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
      updated_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    });
};
  
exports.down = (pgm) => {
    pgm.dropTable('visits');
    pgm.dropTable('objects');
    pgm.dropTable('users');
};  