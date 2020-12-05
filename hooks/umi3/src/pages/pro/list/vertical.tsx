import React from 'react';
import { Button, Tag } from 'antd';
import ProList from '@ant-design/pro-list';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { getListDataSource, ListDataSourceItem } from '@/services/user';
import { useRequest } from 'ahooks';

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

export default () => {
  const request = useRequest(getListDataSource);
  return (
    <ProList<ListDataSourceItem>
      headerTitle="竖排样式"
      itemLayout="vertical"
      toolBarRender={() => [
        <Button type="primary" key="verticalNew">
          新建
        </Button>,
      ]}
      loading={request.loading}
      rowKey="name"
      dataSource={request.data}
      metas={{
        title: { dataIndex: 'name' },
        description: {
          render: (_, row) => (
            <>
              {row.tags?.map((tag) => (
                <Tag key={tag.name} color={tag.color}>
                  {tag.name}
                </Tag>
              ))}
            </>
          ),
        },
        content: { dataIndex: 'desc' },
        actions: {
          render: (_, row: ListDataSourceItem) => [
            <IconText
              icon={StarOutlined}
              text={row.actions?.star.toString()}
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text={row.actions?.praise.toString()}
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text={row.actions?.repeat.toString()}
              key="list-vertical-message"
            />,
          ],
        },
        extra: {
          render: (_, row) => {
            return <img src={row.image} width={270} alt={row.name} />;
          },
        },
      }}
    />
  );
};
