# Testing Checklist for Mini Project Manager

## Backend API Testing

### Authentication
- [ ] Register new user with valid data
- [ ] Try to register with duplicate email (should fail)
- [ ] Try to register with duplicate username (should fail)
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)
- [ ] Verify JWT token is returned on successful login/register

### Projects API
- [ ] Get all projects (empty list for new user)
- [ ] Create project with valid data
- [ ] Create project with title < 3 chars (should fail)
- [ ] Create project with title > 100 chars (should fail)
- [ ] Get all projects (should show created project)
- [ ] Get specific project by ID
- [ ] Try to get another user's project (should fail)
- [ ] Delete own project
- [ ] Try to delete another user's project (should fail)

### Tasks API
- [ ] Create task in own project
- [ ] Create task with empty title (should fail)
- [ ] Update task title
- [ ] Update task completion status
- [ ] Update task due date
- [ ] Delete task
- [ ] Verify tasks are deleted when project is deleted

### Security
- [ ] Try to access protected endpoints without token (should fail)
- [ ] Try to access protected endpoints with invalid token (should fail)
- [ ] Verify users can only access their own data

## Frontend Testing

### Authentication Pages
- [ ] Navigate to login page
- [ ] Try to login without filling form (validation)
- [ ] Login with invalid credentials (error message)
- [ ] Login with valid credentials (redirect to dashboard)
- [ ] Navigate to register page
- [ ] Try to register with password < 6 chars (validation)
- [ ] Register with valid data (redirect to dashboard)
- [ ] Verify can't access login/register when authenticated

### Dashboard
- [ ] Dashboard displays user's username
- [ ] Empty state shows when no projects
- [ ] Click "New Project" opens modal
- [ ] Create project with valid data
- [ ] Try to create project with title < 3 chars (validation)
- [ ] Project appears in list after creation
- [ ] Project card shows title, description, task count, date
- [ ] Click project title navigates to detail page
- [ ] Delete project with confirmation
- [ ] Logout button works and redirects to login

### Project Detail Page
- [ ] Page shows project title and description
- [ ] Page shows task count and creation date
- [ ] Back button returns to dashboard
- [ ] Empty state shows when no tasks
- [ ] Click "Add Task" opens modal
- [ ] Create task with title only
- [ ] Create task with title and due date
- [ ] Task appears in list after creation
- [ ] Check/uncheck task to toggle completion
- [ ] Completed tasks show as completed (strikethrough)
- [ ] Double-click task title to edit
- [ ] Edit task and press Enter to save
- [ ] Edit task and press Escape to cancel
- [ ] Delete task with confirmation

### Navigation & Routing
- [ ] Protected routes require authentication
- [ ] Authenticated users can't access login/register
- [ ] Direct URL navigation works correctly
- [ ] Browser back/forward buttons work

### UI/UX
- [ ] Forms show loading state during submission
- [ ] Error messages display for failed operations
- [ ] Success feedback for successful operations
- [ ] Buttons disable during operations
- [ ] Modals close properly
- [ ] Click outside modal closes it
- [ ] Page is responsive on different screen sizes

## Integration Testing

### End-to-End Workflow
- [ ] Register new user → see empty dashboard
- [ ] Create first project → appears in list
- [ ] Open project → see empty tasks list
- [ ] Add 3 tasks → all appear in list
- [ ] Complete 1 task → shows as completed
- [ ] Edit 1 task title → updates correctly
- [ ] Delete 1 task → removed from list
- [ ] Return to dashboard → see task count = 2
- [ ] Create second project → appears in list
- [ ] Delete first project → removed from list
- [ ] Logout → redirected to login
- [ ] Login again → see remaining project

### Multi-User Testing
- [ ] Create User A and add projects
- [ ] Logout and create User B
- [ ] Verify User B doesn't see User A's projects
- [ ] Add projects for User B
- [ ] Logout and login as User A
- [ ] Verify User A still sees only their projects

## Performance Testing
- [ ] Create 20+ projects → loads quickly
- [ ] Create 50+ tasks in one project → loads quickly
- [ ] Toggle many tasks rapidly → no lag

## Browser Testing
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Edge

## Security Testing
- [ ] Verify JWT stored in localStorage
- [ ] Verify token sent in Authorization header
- [ ] Verify token expires after 7 days
- [ ] Clear localStorage and verify redirect to login
- [ ] Verify passwords are not visible in network tab
- [ ] Verify API returns proper error codes

## Notes
- Mark items with ✅ when tested successfully
- Note any bugs or issues found
- Retest after bug fixes
