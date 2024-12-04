"use client";

import { Property } from "csstype";
import { Parser as Html2ReactParser } from "html-to-react";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

import { ProblemSummary, Ranks } from "@/app/psadder/type";
import { getList } from "@/lib/api/problem.api";

import FlexDirection = Property.FlexDirection;

const LoadProblem = ({
  loadProblemPage,
  setLoadProblemPage,
  setProblemId,
}: {
  loadProblemPage: boolean;
  setLoadProblemPage: Dispatch<SetStateAction<boolean>>;
  setProblemId: Dispatch<SetStateAction<string>>;
}) => {
  const [search, setSearch] = useState<string>("");
  const [problemList, setProblemList] = useState<ProblemSummary[]>([]);

  Modal.setAppElement("#__next");
  const customStyles = {
    content: {
      width: "80%",
      height: "80%",

      margin: "auto",
      backgroundColor: "#121212",

      display: "flex",
      flexDirection: "column" as FlexDirection,
      alignItems: "center",

      backdropFilter: "blur(15px)",
    },
  };

  const afterOpenModal = () => {
    toast
      .promise(getList, {
        pending: "문제 목록을 불러오는 중입니다…",
        success: "문제 목록을 성공적으로 불러왔습니다",
        error: "문제 목록을 불러오는데 실패했습니다",
      })
      .then((problemList) => {
        setProblemList(problemList);
      });
  };

  const openProblem = (pid: string) => {
    setProblemId(pid);
    closeModal();
  };

  const closeModal = () => {
    setLoadProblemPage(false);
  };

  return (
    <>
      <Modal
        style={customStyles}
        isOpen={loadProblemPage}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="LoadProblem">
        <input
          type="text"
          placeholder={"문제 검색"}
          value={search}
          onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
        />
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>문제 번호</th>
              <th>난이도: </th>
              <th>문제 이름</th>
              <th>카테고리</th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            {problemList
              .sort((a, b) => a.pid - b.pid)
              .filter(
                (p) =>
                  !search ||
                  p.id.toString().indexOf(search) !== -1 ||
                  p.title.indexOf(search) !== -1 ||
                  p.description.indexOf(search) !== -1 ||
                  p.category.indexOf(search) !== -1,
              )
              .map((problem, index) => {
                const rank = Html2ReactParser().parse(
                  Ranks[parseInt(problem.difficulty.toString())],
                );
                return (
                  <tr
                    key={index}
                    style={{ textAlign: "center" }}
                    onClick={() => openProblem(problem.id.toString())}>
                    <td style={{ padding: "4px" }}>{problem.pid}</td>
                    <td style={{ padding: "4px" }}>
                      {rank}: {problem.difficulty}
                    </td>
                    <td style={{ padding: "4px" }}>{problem.title}</td>
                    <td style={{ padding: "4px" }}>{problem.category}</td>
                    <td style={{ padding: "4px" }}>
                      {problem.description.slice(0, 80)}
                      {problem.description.length > 80 ? "..." : ""}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Modal>
    </>
  );
};

export default LoadProblem;
