let domain: String;
switch (import.meta.env.MODE) {
  case "development":
    domain = "";

    break;
  case "production":
    domain = "";
  default:
    break;
}
export { domain };
