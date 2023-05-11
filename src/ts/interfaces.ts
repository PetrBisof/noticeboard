export interface ApiResponse {
  currentData: Array<any> | undefined;
  data: Array<any> | undefined;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isUninitialized: boolean;
  refetch: () => void;
  status: "pending";
}

export interface Post {
  id: number;
  userId?: number;
  title?: string;
  body?: string;
}

export interface User {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  postId?: number;
  name: string;
  email?: string;
  body?: string;
}

export interface Notation {
  user: string;
  comments: Comment[];
  id?: number | undefined;
  userId?: number | undefined;
  title?: string | undefined;
  body?: string | undefined;
}

export enum ModalPositionX {
  center = "center",
  right = "right",
  left = "left",
}

export enum ModalPositionY {
  center = "center",
  start = "start",
  end = "end",
}
