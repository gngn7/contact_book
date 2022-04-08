import { useState, useEffect, useCallback } from "react";

type InitialAsyncState = {
  status: "initial";
  data: null;
  error: null;
};

type LoadingAsyncState = {
  status: "loading";
  data: null;
  error: null;
};

type SuccessLoadingState<T> = {
  status: "success";
  data: T;
  error: null;
};

type ErrorLoadingState = {
  status: "error";
  data: null;
  error: string;
};

type AsyncState<T> =
  | InitialAsyncState
  | LoadingAsyncState
  | SuccessLoadingState<T>
  | ErrorLoadingState;

export function useRead<T>(input: RequestInfo): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    status: "initial",
    data: null,
    error: null,
  });

  useEffect(() => {
    setState({
      status: "loading",
      data: null,
      error: null,
    });
    fetch(input, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setState({
          status: "success",
          data,
          error: null,
        });
      })
      .catch((err) => {
        setState({
          status: "error",
          data: null,
          error: String(err),
        });
      });
  }, [input]);

  return state;
}

type AsyncWriteState<Payload, Data> = AsyncState<Data> & {
  write: (data: Payload) => void;
};

export function useWrite<Payload, Data>(
  input: RequestInfo,
  method: "POST" | "PUT" | "DELETE" = "POST"
): AsyncWriteState<Payload, Data> {
  const [state, setState] = useState<AsyncState<Data>>({
    status: "initial",
    data: null,
    error: null,
  });

  const write = useCallback(() => {
    setState({
      status: "loading",
      data: null,
      error: null,
    });
    fetch(input, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setState({
          status: "success",
          data,
          error: null,
        });
      })
      .catch((err) => {
        setState({
          status: "error",
          data: null,
          error: String(err),
        });
      });
  }, [input, method]);

  return { ...state, write };
}
