import z from "zod";

export const  postSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, "Please Enter Title"),
  content: z.string().min(3, "Please Enter Content"),
});

export const loginSchema = z.object({
  email: z.email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Passowrd must be at least 6 characters " }),
});


export const RegisterSchema = z.object({
  email: z.email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Passowrd must be at least 6 characters " }),
  firstName: z.string().min(3, "FirstName must have atleast 3 characters"),
  lastName: z.string().min(3, "LastName must have atleast 3 characters"),
});

export const  ediSchema = z.object({
  firstName: z.string().min(3,"First name must be atleast 3 character"),
  lastName: z.string().min(3,"LastName name must be atleast 3 character"),
  password: z.string().min(6,"Password must be atleast 6 character"),
  bio: z.string().min(3,"Bio must be atleast 3 character"),
  location: z.string().min(3,"Location must be atleast 3 character"),
  phone: z.string().min(5,"Phobe number must be atleast 10 digits"),
  userName: z.string().min(3,"userName must be atleast 3 character"),
});
