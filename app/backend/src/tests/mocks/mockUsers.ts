const mockUsersValids = [
    {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: 'secret_admin'
    },
    {
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'secret_user', 
    },
]

export const mockUsersInvalids = [
  {
    username: 'invalidUserEmail',
    role: 'invalidUserEmail',
    email: '@user.com',
    password: 'secret_user', 
  },
  {
    username: 'invalidUserPassword',
    role: 'invalidUserPassword',
    email: 'invalidUser@email.com',
    password: 'secret_userIncorret', 
  },
]

export default mockUsersValids;