exports.seed = async function (knex) {
  await knex("users").del();
  await knex("posts").del();
  await knex("comments").del();
  await knex("likes").del();

  await knex("users").insert([
    {
      user_id: 1,
      username: "trkGates",
      password: "123456",
      email: "trkGates@gmail.com",
      avatar: "https://picsum.photos/200/200",
      tarih: new Date(),
    },
    {
      user_id: 2,
      username: "Workintech",
      password: "password2",
      email: "Workintech@gmail.com",
      avatar: "https://picsum.photos/200/200",
      tarih: new Date(),
    },
    {
      user_id: 3,
      username: "BillGates",
      password: "password3",
      email: "BillGates@gmail.com",
      avatar: "https://picsum.photos/200/200",
      tarih: new Date(),
    },
  ]);

  await knex("posts").insert([
    {
      post_id: 1,
      user_id: 1,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae.",
      like_sayisi: 0,
      tarih: new Date(),
    },
    {
      post_id: 2,
      user_id: 2,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae.",
      like_sayisi: 0,
      tarih: new Date(),
    },
    {
      post_id: 3,
      user_id: 3,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae.",
      like_sayisi: 0,
      tarih: new Date(),
    },
  ]);

  await knex("comments").insert([
    {
      comment_id: 1,
      post_id: 1,
      user_id: 1,
      content: "Sana Katılmıyorum :)",
      like_sayisi: 0,
      tarih: new Date(),
    },
    {
      comment_id: 2,
      post_id: 2,
      user_id: 2,
      content: "Çok Haklısın :)",
      like_sayisi: 0,
      tarih: new Date(),
    },
    {
      comment_id: 3,
      post_id: 3,
      user_id: 3,
      content: "Kesinlikle Katılıyorum",
      like_sayisi: 0,
      tarih: new Date(),
    },
  ]);

  await knex("likes").insert([
    {
      like_id: 1,
      post_id: 1,
      user_id: 1,
      comment_id: 1,
      tarih: new Date(),
    },
    {
      like_id: 2,
      post_id: 2,
      user_id: 2,
      comment_id: 2,
      tarih: new Date(),
    },
    {
      like_id: 3,
      post_id: 3,
      user_id: 3,
      comment_id: 3,
      tarih: new Date(),
    },
  ]);
};
