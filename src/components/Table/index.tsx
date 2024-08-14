/** table组件  **/
import React, { useMemo, useRef, useState } from "react";
import { TableProps } from "./interface";
import "./index.css";

export default function Table(props: TableProps): JSX.Element {
    const {
        columns,
        dataSource,
        paginationConfig = undefined,
        scroll
    } = props;
    const [pageSize, setPageSize] = useState(paginationConfig?.pageSize || 10); // 每页显示条数
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); //升序或降序
    const [currentPage, setCurrentPage] = useState(1); // 当前页码

    // 访问表头和表身元素
    const headerRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    // 同步滚动的函数
    const syncScroll = () => {
        if (headerRef.current && bodyRef.current) {
            headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
        }
    };

    //点击排序
    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };
    //排序数据处理
    const sortedData = useMemo(() => {
        if (!sortKey) return dataSource;
        return [...dataSource].sort((a, b) => {
            const order = sortOrder === "asc" ? 1 : -1;
            return a[sortKey] > b[sortKey] ? order : -order;
        });
    }, [dataSource, sortKey, sortOrder]);

    //当前页数据
    const paginatedData = sortedData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );
    return (
        <div className="table" >
            <div className="table-header" ref={headerRef} style={{width: scroll?.x || "100%"}}>
                <table>
                    <colgroup>
                        {columns?.map((item, index) => {
                            return (
                                <col
                                    key={item.key}
                                    style={{ width: item.width }}
                                />
                            );
                        })}
                        <col
                            key={999}
                            style={{ width: 16, backgroundColor: "fff" }}
                        />
                    </colgroup>
                    <thead>
                        <tr>
                            {columns?.map((item, index) => {
                                return (
                                    <th
                                        key={item.key}
                                        className={
                                            item.fixed
                                                ? `fixed-${item.fixed}`
                                                : ""
                                        }
                                    >
                                        {item.title}
                                        <span
                                            className="sort"
                                            onClick={() => handleSort(item.key)}
                                        >
                                            {item.sortable &&
                                                (sortOrder === "asc"
                                                    ? " 🔼"
                                                    : " 🔽")}
                                        </span>
                                    </th>
                                );
                            })}
                            <th
                                style={{
                                    width: 8,
                                    borderLeft: "0px",
                                    background: "fff",
                                    right: 0,
                                }}
                                className="fixed-right"
                            ></th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div
                className="table-body"
                ref={bodyRef}
                style={{ height: scroll?.y || '100%' ,width: scroll?.x || "100%"}}
                onScroll={syncScroll}
            >
                <table>
                    <colgroup>
                        {columns?.map((item, index) => {
                            return (
                                <col
                                    key={item.key}
                                    style={{ width: item.width }}
                                />
                            );
                        })}
                    </colgroup>
                    <tbody>
                        {paginatedData?.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    {columns?.map((column, index) => {
                                        return (
                                            <td
                                                key={column.key}
                                                className={
                                                    column.fixed
                                                        ? `fixed-${column.fixed}`
                                                        : ""
                                                }
                                            >
                                                {item[column.dataIndex]}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                {/* 分页控件 */}
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>current page： {currentPage}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage * pageSize >= dataSource.length}
                >
                    Next
                </button>
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                >
                    <option value={10}>10条/页</option>
                    <option value={20}>20条/页</option>
                </select>
            </div>
        </div>
    );
}
