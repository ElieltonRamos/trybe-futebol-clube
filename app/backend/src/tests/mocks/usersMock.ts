const mockUsersValids = [
    {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    },
    {
      id: 2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
    },
]

export const mockUsersInvalids = [
  {
    username: 'invalidUserEmail',
    role: 'invalidUserEmail',
    email: '@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
  },
  {
    username: 'invalidUserPassword',
    role: 'invalidUserPassword',
    email: 'invalidUser@email.com',
    password: '$2a$10$HDkFwOMKOI6PTza0F7.YRu1Bqsqb9hx7XkuV7QeYB5dRL4z9DI1Mu', 
  },
]

export const token = 'Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlck5hbWUiOiJVc2VyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDMxNzEzMjR9.y2SmXCeanMiyNSLY8K6tVoZdA2-CjYOalC3W7zuo3WY'

export default mockUsersValids;