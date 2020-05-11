export const changeStatus = (
  status: "READY" | "LIVE" | "END"
): "매칭대기" | "매칭중" | "통화종료" => {
  if (status === "READY") {
    return "매칭대기";
  } else if (status === "LIVE") {
    return "매칭중";
  } else if (status === "END") {
    return "통화종료";
  }
};
