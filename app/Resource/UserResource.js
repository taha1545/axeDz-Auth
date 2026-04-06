
module.exports = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    google_id: user.google_id || null,
    imagePath: user.imagePath || "",
    is_verified: Boolean(user.is_verified),
    created_at: user.created_at || user.createdAt || null,
    updated_at: user.updated_at || user.updatedAt || null,
  };
};