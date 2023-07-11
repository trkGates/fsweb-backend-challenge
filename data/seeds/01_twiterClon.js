/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { username: 'john', email: 'john@example.com' },
        { username: 'emma', email: 'emma@example.com' }
      ]);
    });
};
