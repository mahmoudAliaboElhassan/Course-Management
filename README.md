
# This Crud is for posts to handle Adding, Editing and Deleting posts

## _______________________________________How to use the Website_______________________________________


https://github.com/mahmoudAliaboElhassan/Posts-Crud/assets/105460542/b2a56bad-9f94-4dae-928f-f5ea4664e660


## This Crud was made by many **libraries**
1. react-router-dom to serve the principle of **Single Page Application**.
2. react-redux and redux toolkit to handle state management **globally**.
3. axios to deal with **API** for Authentication, fetching, adding, editing and deleting Posts.
4. bootstrap and react-bootstrap to serve the principle of **responsiveness**.
5. formik and yup to handle validation of inputs with rules of length, number or letter , non-empty fields by using **regular expression**.
6. framer-motion to make **beautiful Transitions** between pages.
7. i18next, i18next-browser-languagedetector, i18next-http-backend, react-i18next and i18next-http-backend to make website multilingual.
8. mdb-ui-kit for **flags** that appears when dealing with languages.
9. sweetalert to display **beautiful alerts** for warning when deleting post or when there is a problem in authentication.
10. react-toastify to display amazing toasts when signing up , logging in , adding post, editing post.
11. react-select to display awesome select for Posts type.
12. gh-pages to activate the **hosting** of github.

      - In addition to the Website can be in both modes **Dark** and **Light**.
      - Website uses **Loader** that appears when navigation between pages.
      - There is a **page for every post** that display its title, description, image, type and date posted in day, date, hour, minute, second.
      - there is an **error page** that display the error as you can not go to post/ch it must be number.
      - there is a component called loading.jsx that can display **loading message** 
      and **error** if exists, if children is button it **clone** it and change to loading and make it disabled.
      - Website uses **axios instance** to shorten The code.
      - Website uses used withGuard that acecpt component to apply the principle of higher order component (**HOC**) to use the principle of **protected routes**.
      - Images as icons of .svg extension from **react-feather** library.
      - Website uses **React.lazy** to load components lazily, to make the component will be loaded only when it's actually needed, 
      which help improving the initial loading time and performance .
      - Website uses **convention** to make CSS styles are scoped to a specific component and prevent other component of being styled by.
      - Website uses used some **ECMAScript** principles
       in different places such as **ternary operator** and AND operator **(&&)**  to handle true condition only.
      -Website was keen on being **optimized** and there is no many **re-renders** thought **useCallback**.
      -  Website uses **Prefixes** in CSS  to handle browser-specific CSS properties and features that are still in development or are not fully supported by all browsers to ensure that the **styles are applied correctly**.
      - Footer  used **entity** to display copy rights icon and current year in footer is **dynamic** and is changed every year.
      - Website uses **navigation buttons** to navigate between pages to display posts.
      - Website uses select to **filter** posts with **localStorage**.
      - Website uses **Optional Chaining** to Increase readability and simplify otherwise long logical conjunctions and complex-looking conditions.
      - Website  uses the principle of **custom hooks** to shorten The code and make it more **efficient**.
      - Website was keen on beeing **friendly** with Search Engine Optimization (**SEO**).
      - Website uses **real authentication** and validating it from (SignUp , LogIn , ForgetPassword , Reset Password).
      - demo of the site [Live Preview](https://posts-crud-three.vercel.app/).
      - and here is the link of backend used in This Project [Backend-Repo](https://github.com/mohamedAbdelaleem/Notes).
    ## This is all I wanted to say thanks for reading.
