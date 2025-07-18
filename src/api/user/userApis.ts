import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../handler";
import type { ediSchema } from "../../features/profile/Edit";
import type z from "zod";

export const useUerProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/user/profile");
      return data;
    },
  });
};

export const useUerProfilebyId = (id: string) => {
  return useQuery({
    queryKey: ["userProfile", id],
    queryFn: async () => {
      if (id) {
        const { data } = await axiosInstance.get(`/user/byId/${id}`);
        return data;
      }
    },
  });
};

export const useUerUpdateProfile = () => {
  return useMutation({
    mutationFn: async (payload: z.infer<typeof ediSchema>) => {
      const basic = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: payload.password,
      };
      const profile = {
        bio: payload.bio,
        location: payload.location,
        phone: Number(payload.phone),
        userName: payload.userName,
      };

      const data = await Promise.all([axiosInstance.put("/user/update",basic),axiosInstance.put("/user/profile/update",profile)])
      return data;
    },
  });
};

export const useDeleteUser = () => {

  return useMutation({
    mutationFn: async (_) => {
      const { data } = await axiosInstance.delete("user/removeUser");
      return data;
    },
    onSuccess: () => {
      localStorage.removeItem("token");
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
};
