export type ReqStatus<T> =
    | {
          isLoading: false
          isError: false
          isSuccess: false
          data: null
      }
    | {
          isLoading: true
          isError: false
          isSuccess: false
          data: null
      }
    | {
          isLoading: false
          isError: true
          isSuccess: false
          data: null
      }
    | {
          isLoading: false
          isError: false
          isSuccess: true
          data: T
      }

export const defaultStatus: ReqStatus<any> = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: null,
}

export const load = async <T>(
    promise: () => Promise<T>,
    setter: (val: ReqStatus<T>) => void,
    current: ReqStatus<T>
) => {
    if (current.isSuccess || current.isError || current.isLoading) return

    setter({
        ...defaultStatus,
        isLoading: true,
    })
    try {
        const res = await promise()
        setter({
            ...defaultStatus,
            isSuccess: true,
            data: res,
        })
    } catch {
        setter({
            ...defaultStatus,
            isError: true,
        })
    }
}
