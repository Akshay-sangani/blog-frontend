import {  useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../handler";

export const useGetAllPost = () => {
  return useQuery({
    queryKey: ["posts"],
    //  initialPageParam: 0,
    // getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    queryFn: async () => {
      const { data } = await axiosInstance.get("/post/all-posts");
      return data;
    },
  });
};

export const useGetOnePost = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/post/${id}`);
      return data;
    },
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: async (payload: { title: string; content: string }) => {
      const { data } = await axiosInstance.post(`/post/`, payload);
      return data;
    },
  });
};

export const useUpdatePost = () => {
  return useMutation({
    mutationFn: async (payload: {
      id?: number;
      title: string;
      content: string;
    }) => {
      const { data } = await axiosInstance.put(
        `/post/update/${payload.id}`,
        payload
      );
      return data;
    },
  });
};

export const useDeletePost = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(`/post/delete/${id}`);
      return data;
    },
  });
};

export const useLikePost = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.get(`/post/like/${id}`);
      return data;
    },
  });
};

export const useSearchPostUser = (query : string) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/post/Searchfilter/postUser?query=${query}`);
      return data;
    },
    enabled: false,
    refetchOnWindowFocus: false 
  });
};


export const useCommentPost = ()=>{
  return useMutation({
    mutationFn : async(payload : {id : number , content : string})=>{
      const {data} = await axiosInstance.post(`/post/comment/${payload.id}`,payload)
      return data
    }
  })
}


