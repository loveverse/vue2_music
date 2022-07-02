let domain;
switch (import.meta.env.MODE) {
  case "development":
    domain = "http://localhost:5200";
    break;
  case "production":
    domain = "http://loveverse.top";
    break;
  default:
    break;
}
export { domain };
