const { server } = require("./config");
const router = require("./router");
const init = async () => {
  router();
  await server.start();
  console.log("🚀 Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
