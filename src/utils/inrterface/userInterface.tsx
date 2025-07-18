export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profile: {
    userName: string;
    bio: string;
    location: string;
    phone: number;
    id: number;
  };

  comments: [
    {
      id: number;
      content: string;
      createdAt: string;
      deletedAt: null;
      updateAt: string;
    }
  ];
  posts: [
    {
      id: number;
      title: string;
      content: string;
      createdAt: string;
      deletedAt: null;
      updateAt: string;
    }
  ];
}