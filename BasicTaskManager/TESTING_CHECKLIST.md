# ✅ Testing Checklist

Use this checklist to verify that the Task Manager application is working correctly.

## 🔧 Pre-Testing Setup

- [ ] .NET 8 SDK is installed (`dotnet --version`)
- [ ] Node.js v18+ is installed (`node --version`)
- [ ] Backend dependencies restored (`cd BasicTaskManager\Backend && dotnet restore`)
- [ ] Frontend dependencies installed (`cd BasicTaskManager\Frontend && npm install`)

## 🚀 Application Startup

- [ ] Backend starts without errors on http://localhost:5294
- [ ] Frontend starts without errors on http://localhost:5173
- [ ] No CORS errors in browser console
- [ ] Application loads in browser

## 📝 Core Functionality Tests

### View Tasks (GET)
- [ ] Initial tasks are displayed (2 sample tasks)
- [ ] Tasks show correct description text
- [ ] Completion status is displayed correctly
- [ ] Loading state appears briefly when fetching

### Add Task (POST)
- [ ] Can type in the input field
- [ ] "Add Task" button is clickable
- [ ] Empty task cannot be submitted
- [ ] New task appears at the bottom of the list
- [ ] New task is uncompleted by default
- [ ] Input field clears after adding task
- [ ] No error messages appear

### Toggle Completion (PUT)
- [ ] Can click checkbox to mark task as complete
- [ ] Completed task shows strikethrough text
- [ ] Can click checkbox again to mark as incomplete
- [ ] Strikethrough disappears when uncompleted
- [ ] Changes are reflected immediately

### Delete Task (DELETE)
- [ ] "Delete" button is visible for each task
- [ ] Can click "Delete" button
- [ ] Task is removed from list immediately
- [ ] No error messages appear
- [ ] Other tasks remain unchanged

## 🎨 UI/UX Tests

### Layout
- [ ] Application title is displayed
- [ ] Form is at the top
- [ ] Task list is below the form
- [ ] Each task item is properly formatted

### Styling
- [ ] Colors are consistent and readable
- [ ] Buttons have hover effects
- [ ] Input field is styled appropriately
- [ ] Checkboxes are properly styled
- [ ] Responsive design works on different screen sizes

### User Feedback
- [ ] Error messages appear when backend is down
- [ ] Loading indicator shows when fetching data
- [ ] Empty state message shows when no tasks
- [ ] Visual feedback on button hover

## 🔌 API Tests

### Direct API Testing (using PowerShell or Postman)

#### GET /api/tasks
```powershell
Invoke-RestMethod -Uri "http://localhost:5294/api/tasks" -Method Get
```
- [ ] Returns 200 OK status
- [ ] Returns array of tasks
- [ ] Each task has id, description, isCompleted

#### POST /api/tasks
```powershell
$body = @{ description = "Test Task"; isCompleted = $false } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5294/api/tasks" -Method Post -Body $body -ContentType "application/json"
```
- [ ] Returns 201 Created status
- [ ] Returns newly created task with generated ID
- [ ] New task appears in GET request

#### PUT /api/tasks/{id}
```powershell
$id = "YOUR_TASK_ID_HERE"
$body = @{ id = $id; description = "Updated Task"; isCompleted = $true } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5294/api/tasks/$id" -Method Put -Body $body -ContentType "application/json"
```
- [ ] Returns 204 No Content status
- [ ] Task is updated in GET request
- [ ] Returns 404 for non-existent ID

#### DELETE /api/tasks/{id}
```powershell
$id = "YOUR_TASK_ID_HERE"
Invoke-RestMethod -Uri "http://localhost:5294/api/tasks/$id" -Method Delete
```
- [ ] Returns 204 No Content status
- [ ] Task is removed from GET request
- [ ] Returns 404 for non-existent ID

## 🛡️ Error Handling Tests

### Backend Down
- [ ] Stop backend, try to add task
- [ ] Error message appears in UI
- [ ] Application doesn't crash

### Invalid Data
- [ ] Try to add empty task → prevented
- [ ] Try to update non-existent task → handles gracefully

### Network Issues
- [ ] Simulate slow network
- [ ] Loading states work correctly
- [ ] Timeouts are handled

## 🔄 State Management Tests

- [ ] Multiple tabs: Changes in one tab don't affect another (expected behavior with in-memory storage)
- [ ] Refresh page: Data is lost (expected with in-memory storage)
- [ ] Add 10+ tasks: All display correctly
- [ ] Delete all tasks: Empty state shows

## 🌐 Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)

## 🎯 Performance Tests

- [ ] Initial load is fast (< 2 seconds)
- [ ] Adding task is instant
- [ ] Toggling completion is instant
- [ ] Deleting task is instant
- [ ] No memory leaks after 100+ operations

## 📱 Responsive Design Tests

Test at different screen widths:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768px width)
- [ ] Mobile (375px width)

## 🔧 Developer Tools Tests

### Console
- [ ] No JavaScript errors
- [ ] No TypeScript errors
- [ ] API calls are logged correctly

### Network Tab
- [ ] GET /api/tasks returns 200
- [ ] POST /api/tasks returns 201
- [ ] PUT /api/tasks/{id} returns 204
- [ ] DELETE /api/tasks/{id} returns 204
- [ ] CORS headers are present

### React DevTools
- [ ] Component tree is clean
- [ ] State updates correctly
- [ ] No unnecessary re-renders

## 🏗️ Build Tests

### Backend
```powershell
cd BasicTaskManager\Backend
dotnet build
```
- [ ] Build succeeds with 0 warnings
- [ ] Build succeeds with 0 errors

### Frontend
```powershell
cd BasicTaskManager\Frontend
npm run build
```
- [ ] Build succeeds
- [ ] dist folder is created
- [ ] No TypeScript errors
- [ ] No linting errors

## 📦 Code Quality Tests

### Backend
- [ ] Code follows C# naming conventions
- [ ] Controllers are properly organized
- [ ] Models are in correct namespace
- [ ] CORS is configured correctly
- [ ] API routes are RESTful

### Frontend
- [ ] Code follows React best practices
- [ ] Components use TypeScript properly
- [ ] Hooks are used correctly
- [ ] CSS is organized and clean
- [ ] No unused imports

## 🎉 Final Verification

- [ ] All tests passed
- [ ] No critical issues found
- [ ] Application is production-ready
- [ ] Documentation is complete

## 📊 Test Results

Date Tested: _______________
Tested By: _______________
Environment: _______________

### Summary
- Total Tests: _____ / _____
- Passed: _____
- Failed: _____
- Skipped: _____

### Critical Issues Found
1. 
2. 
3. 

### Minor Issues Found
1. 
2. 
3. 

### Notes
_______________________________________________
_______________________________________________
_______________________________________________

---

✅ **Testing Complete!** Your Task Manager is ready to use!
