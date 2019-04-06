exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { name: 'Frodo Baggings', password: 'frodopass' }, // 1
    { name: 'Samwise Gamgee', password: 'sampass' }, // 2
    { name: 'Meriadoc Brandybuck', password: 'meriadocpass' }, // 3
    { name: 'Peregrin Took', password: 'peregrinpass' }, // 4
    { name: 'Mithrandir', password: 'mithrandirpass' }, // 5
    { name: 'Boromir', password: 'boromirpass' }, // 6
    { name: 'Legolas', password: 'legolaspass' }, // 7
    { name: 'Gimly', password: 'gimlypass' }, // 8
    { name: 'Aragorn', password: 'aragornpass' }, // 9
  ]);
};
