# E-Commerce Website

This project is an e-commerce website built using Next.js, Redux Toolkit, and custom APIs to manage products and user authentication. Below is an overview of the development process, the APIs created, and their integration.

## Overview

A fully functional e-commerce website with the following key features:
- Product listing and categorization (e.g., dashboard, products page).
- User authentication (login and sign-up functionality).
- Cart and order management (integrated into the dashboard).
- Responsive design with a carousel for featured products.

The development process included setting up a client-side application with Next.js, managing state with Redux, and integrating custom APIs to handle data models for products and users. All development adhered to the rules and regulations outlined in the task PDF, ensuring compliance with specified guidelines.

## APIs Created

Two APIs were designed and implemented to support the e-commerce functionality:

1. **Products API**
   - **Purpose**: Manages product data, including titles, categories, prices, and availability.
   - **Endpoint**: `https://6852e9e20594059b23cf9776.mockapi.io/products/v1/products`
   - **Integration**: The `useGetProductsQuery` hook from `store/services/productsApi.ts` fetches product data and is integrated into `src/app/products/page.tsx` for product listings and `src/app/page.tsx` for the carousel.
   - **Link**: [Products API Implementation](store/services/productsApi.ts)

2. **Users API**
   - **Purpose**: Handles user authentication, including sign-up and login functionality, with user details like name, email, password, and address.
   - **Endpoint**: `https://6852e9e20594059b23cf9776.mockapi.io/products/v1/Users`
   - **Integration**: The `useSignUpMutation` and `useLoginQuery` hooks from `store/services/usersApi.ts` are integrated into `src/app/page.tsx` for authentication forms and `src/app/dashboard/page.tsx` for user data display after login.
   - **Link**: [Users API Implementation](store/services/usersApi.ts)

## Integration Details

- **Products Integration**: The `useGetProductsQuery` hook retrieves product data asynchronously and renders it using the `ProductCard` component. Filtering by category is implemented in `src/app/products/page.tsx` using `useSearchParams`, wrapped in a `Suspense` boundary for optimal loading.
- **Users Integration**: The `useSignUpMutation` and `useLoginQuery` hooks manage user registration and login. After a successful login, the `setCredentials` action updates the Redux state, redirecting users to the dashboard (`src/app/dashboard/page.tsx`), where user data (e.g., name, email, address) is displayed.
- **State Management**: Redux Toolkit ensures state consistency across components, with `authSlice` handling authentication state and `cart` managing cart items.

## Development Process

1. **Setup**: Initialized a Next.js project with client-side rendering ("use client") and integrated Redux with `ReduxProviderWrapper`.
2. **API Development**: Created `productsApi` and `usersApi` in `store/services/` with endpoints for CRUD operations and authentication.
3. **Component Integration**: Developed components like `Navbar`, `Footer`, `ProductCard`, and `CarouselWrapper`, linking them with API data.
4. **Authentication Flow**: Implemented sign-up and login forms in `src/app/page.tsx`, with dashboard integration in `src/app/dashboard/page.tsx` to display user-specific data.
5. **Testing**: Tested navigation (using `Link` from `next/link`), API responses, and state updates on `https://e-commerce-next-js-swym.vercel.app/`



## Deployment : Deployed the application to a live server at [https://e-commerce-next-js-swym.vercel.app/](https://e-commerce-next-js-swym.vercel.app/).








## Getting Started

First, run the development server:

```bash
npm run dev
