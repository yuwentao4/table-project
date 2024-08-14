

export interface PaginationConfig {
    /**
     * 当前页码
     */
    current: number;

    /**
     * 每页显示条数
     */
    pageSize: number;

    /**
     * 数据总数
     */
    total: number;
}
export interface TableProps {
    /**
     * 表格数据
     */
    dataSource: any[];

    /**
     * 表格列配置
     */
    columns: any[];

    /**
     * 表格是否展示边框
     */
    border?: boolean;

    /**
     * 表格是否展示斑马纹
     */
    stripe?: boolean;

    /**
     * 表格是否展示行号
     */
    showIndex?: boolean;
    // 表格是否展示滚动条
    scroll?: {
        x?: number;
        y?: number;
    };

    /**
     * 表格分页配置
     */
    paginationConfig?: PaginationConfig;
}
