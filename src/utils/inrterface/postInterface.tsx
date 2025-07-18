export interface PostInterface {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  deletedAt: string;
  updateAt: string;
  likedBy: [
    {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      createdAt: string;
      deletedAt: string;
      updateAt: string;
      profile: {
        id: number;
        userName: string;
        bio: string;
        location: string;
        phone: number;
        createdAt: string;
        deletedAt: string;
        updateAt: string;
      };
    }
  ];
  comments: [
    {
      id: number;
      content: string;
      createdAt: string;
      deletedAt: string;
      updateAt: string;
      user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: string;
        deletedAt: string;
        updateAt: string;
        profile: {
          id: number;
          userName: string;
          bio: string;
          location: string;
          phone: number;
          createdAt: string;
          deletedAt: string;
          updateAt: string;
        };
      };
    }
  ];
  author: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
    deletedAt: string;
    updateAt: string;
    profile: {
      id: number;
      userName: string;
      bio: string;
      location: string;
      phone: number;
      createdAt: string;
      deletedAt: string;
      updateAt: string;
    };
  };
}

export interface paginatedInterface {
  pages: [
    {
      items: PostInterface[];
      page: number;
      perPage: number;
      totalPages: number;
      totalCount: number;
      statusCounts?: Record<string, number>;
    }
  ];
  pageParams: [number];
}
