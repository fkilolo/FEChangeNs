import {
    EditableProTable,
    EditableProTableProps,
    ParamsType,
} from '@ant-design/pro-components';
import vi_VN from 'antd/locale/vi_VN';
import { ConfigProvider } from 'antd';

const EditDataTable = <
    T extends Record<string, any>,
    U extends ParamsType = ParamsType,
    ValueType = 'text',
>({
    columns,
    defaultData = [],
    postData,
    loading,
    rowKey = (record) => record.id,
    scroll,
    params,
    request,
    search,
    polling,
    toolBarRender,
    headerTitle,
    actionRef,
    dateFormatter = 'string',
    rowSelection,
    expandable,
    form,
    maxLength,
    recordCreatorProps,
    editable,
    value
}: EditableProTableProps<T, U, ValueType>) => {
    return (
        <ConfigProvider locale={vi_VN}>
            <EditableProTable<T, U, ValueType>
                columns={columns}
                defaultData={defaultData}
                postData={postData}
                bordered
                // sticky={sticky}
                loading={loading}
                rowKey={rowKey}
                scroll={scroll}
                params={params}
                request={request}
                search={search}
                polling={polling}
                toolBarRender={toolBarRender}
                headerTitle={headerTitle}
                actionRef={actionRef}
                dateFormatter={dateFormatter}
                rowSelection={rowSelection}
                expandable={expandable}
                form={form}
                maxLength={maxLength}
                recordCreatorProps={recordCreatorProps}
                editable={editable}
                value={value}
            />
        </ConfigProvider>
    );
};

export default EditDataTable;
