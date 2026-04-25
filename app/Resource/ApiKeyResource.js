module.exports = (apiKey) => {
  return {
    id: apiKey.id,
    user_id: apiKey.user_id,
    project_name: apiKey.project_name,
    key: apiKey.key,
    status: apiKey.status,
    created_at: apiKey.created_at || apiKey.createdAt || null,
    updated_at: apiKey.updated_at || apiKey.updatedAt || null,
  };
};