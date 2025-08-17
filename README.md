## Live Demo

You can view this project live at: [placedshare.netlify.app](https://placedshare.netlify.app)


## CRUD Operations with Axios: Learnings & Application

### What is CRUD?
CRUD stands for Create, Read, Update, and Delete—the four basic operations for managing data in web applications.


### How Axios is Used for CRUD in This Project

- **Create (POST):**
	- Used `axios.post` to send new post data to the API.
	- Example: Submitting the form sends a POST request to add a new post.	

- **Read (GET):**
	- Used `axios.get` to fetch all posts from the API and display them in the UI.
	- Example: On component mount, a GET request loads all posts.

- **Update (PUT/PATCH):**
	- (If implemented) Would use `axios.put` or `axios.patch` to update an existing post.
	- Example: Editing a post and sending the updated data to the API.

- **Delete (DELETE):**
	- Used `axios.delete` to remove a post from the API and update the UI.
	- Example: Clicking the Delete button sends a DELETE request for that post.

### Key Learnings
- Axios makes it easy to perform all CRUD operations with simple methods (`get`, `post`, `put`, `patch`, `delete`).
- Each method returns a promise, allowing for async/await or `.then/.catch` handling.
- After each operation, the UI state is updated to reflect the changes (e.g., adding, removing, or editing posts).
- For mock APIs like JSONPlaceholder, some operations (like POST) do not persist data, so local state management is important.

### Example Axios Usage
```js
// Create
axios.post('/posts', { title, body });
// Read
axios.get('/posts');
// Update
axios.put('/posts/1', { title, body });
// Delete
axios.delete('/posts/1');
```

---
Understanding and applying CRUD operations with Axios is fundamental for building interactive, data-driven React applications.
## Today's Learning Summary

### 1. Controlled Components in React
- Learned how to use controlled components, where form input values are managed by React state.
- Used the `value` and `onChange` props to keep the UI and state in sync.

### 2. Handling Form Data
- Used a single change handler for multiple fields by leveraging the `name` property of inputs.
- Updated state dynamically based on the input field being changed.

### 3. Submitting Form Data
- Handled form submission with an `onSubmit` handler to prevent default behavior and process the data.
- Sent form data to a mock API (JSONPlaceholder) using Axios.

### 4. API Response and Unique ID Handling
- Noted that JSONPlaceholder always returns `id: 101` for new posts, which can cause conflicts.
- Implemented a workaround by generating a unique id locally (using the max id in the current data) before adding a new post to the UI.

### 5. General React Best Practices
- Kept form state minimal (no need to initialize id in state).
- Used async/await for API calls and handled errors gracefully.
- Ensured UI updates immediately and correctly after adding a new post.

---

These concepts are essential for building robust, interactive forms and managing data flow in React applications, especially when working with APIs and mock backends.





### 1. Controlled Components & useEffect
- Learned how to use controlled components for form handling in React.
- Used `useEffect` to populate form fields when editing, and to clear them after editing is done.
- Mistake: Not realizing that resetting `editData` to `{}` triggers `useEffect` and clears the form fields. Now understood that state and effect dependencies are tightly linked.

### 2. Axios CRUD Operations
- Practiced all CRUD operations (Create, Read, Update, Delete) using Axios.
- Mistake: In the PUT (update) method, accidentally passed the function itself instead of the data object to Axios, causing the wrong payload to be sent. Fix: Always pass the actual data object as the second argument to `axios.put`.

### 3. Local State Management with Mock APIs
- JSONPlaceholder does not persist changes, so local state must be updated manually after POST/PUT/DELETE.
- Mistake: Expected the API to return the updated data, but with mock APIs, you must update your UI state yourself for consistency.

### 4. Unique ID Generation
- When adding new posts, generated a unique id locally to avoid conflicts (since JSONPlaceholder always returns id: 101 for new posts).
- Mistake: Initially relied on the API's id, which caused duplicate keys. Fix: Use `Math.max(...data.map(post => post.id)) + 1` to generate a unique id.

### 5. Updating State After Edit
- Used `setData` with `map` to update only the edited post in the list.
- Mistake: Used `res.data.id` from the API, which may not always match the local post id. Fix: Use the id from the local state (`editData.id`) for reliable updates.

### 6. Form Reset After Edit
- After editing, cleared both `addData` and `editData` to reset the form.
- Learned that this triggers the `useEffect` and ensures the form is ready for a new entry.

---
These learnings and fixes have improved understanding of React state, controlled forms, effect dependencies, and working with mock APIs and Axios for CRUD operations.





## useRef Hook in React

### What is useRef?
`useRef` is a React hook that returns a mutable ref object whose `.current` property is initialized to the passed argument. The ref object persists for the full lifetime of the component.

### Properties and Usage
- **.current**: The main property of the ref object. You can read or assign any value to it.
- **Persistence**: The value of `.current` does not change across re-renders unless you explicitly set it.
- **No re-render**: Updating `.current` does not cause the component to re-render.

### Common Use Cases
1. **Accessing DOM elements**: Attach the ref to a DOM node to directly access or manipulate it (e.g., focus an input).
2. **Storing mutable values**: Store any mutable value that you don’t want to trigger a re-render when changed (e.g., timers, previous values).
3. **Interacting with child components**: Pass a ref to a child component (if it is a DOM element or uses `forwardRef`) to access its DOM node or imperative methods.

### Example: Accessing a DOM Node
```js
const inputRef = useRef();
<input ref={inputRef} />
// Focus the input
inputRef.current.focus();
```

### Example: useRef with Child Components
If you want to access a child component’s DOM node or methods, the child must use `React.forwardRef`:
```js
// Parent
const myRef = useRef();
<ChildComponent ref={myRef} />

// Child
const ChildComponent = React.forwardRef((props, ref) => (
	<div ref={ref}>Hello</div>
));
```

### Key Points
- `useRef` is not just for DOM access; it can store any mutable value.
- Changing `.current` does not cause a re-render.
- For refs to work with child components, the child must use `forwardRef`.
- Useful for scroll targets, focus management, storing previous values, and more.

---
Understanding `useRef` is essential for advanced React patterns, especially when you need to interact with the DOM or manage mutable values outside the render cycle.
## New Learnings & Common Mistakes (with Fixes)
