export const getFormattedDate = (date: any, format: string = "") => {
  if (date === "") {
    return date;
  }
  if (format === "") {
    return new Date(date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (format === "YYYY-MM-DD") {
    let a = [{ year: "numeric" }, { month: "2-digit" }, { day: "2-digit" }];
    let t = new Date(date);
    let formatted = a
      .map((m: any) => {
        let f = new Intl.DateTimeFormat("en", m);
        return f.format(t);
      })
      .join("-");
    return formatted;
  }
  if (format === "MM-DD") {
    let a = [{ month: "long" }, { day: "2-digit" }];
    let t = new Date(date);
    let formatted = a
      .map((m: any) => {
        let f = new Intl.DateTimeFormat("en", m);
        return f.format(t);
      })
      .join("  ");
    return formatted;
  }
};
