const dayjs = require('dayjs');

module.exports = (contact) => {
  const createdAt = contact.created_at || contact.createdAt;
  return {
    id: contact.id,
    name: contact.name || "",
    email: contact.email || "",
    phone: contact.phone || "",
    subject: contact.subject || "",
    message: contact.message || "",
    status: contact.status || "unread",
    created_at: createdAt ? dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss") : null,
  };
};