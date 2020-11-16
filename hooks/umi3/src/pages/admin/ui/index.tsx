import React, { useState } from 'react';
import { Card, Divider, Button, Input, Form, Checkbox } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {
  useDrag,
  useDrop,
  useDynamicList,
  useRequest,
  useSelections,
} from 'ahooks';

import { getUserList, UserListItem } from '@/services/user';
import styles from './index.less';

export default () => {
  //拖拽的例子
  const [dragging, setDragging] = useState<string | null>(null);
  const getDragProps = useDrag({
    onDragStart: (data) => {
      setDragging(data);
    },
    onDragEnd: () => {
      setDragging(null);
    },
  });

  const getDropsProps = (id: string) => {
    return useDrop({
      onDom: (content: string, e) => {
        alert(`${id}: ${content} 被放入了`);
      },
      onFiles: (files, e) => {
        console.log(e, files);
        alert(`${id}: ${files.length} file dropped`);
      },
      onUri: (uri, e) => {
        console.log(e);
        alert(`${id}: uri= ${uri} dropped`);
      },
      onText: (text, e) => {
        console.log(e);
        alert(`'${id}: text= ${text}' dropped`);
      },
    });
  };

  const [drop1Props, { isHovering: drop1Hovering }] = getDropsProps('d1');
  const [drop2Props, { isHovering: drop2Hovering }] = getDropsProps('d2');

  //动态添加html元素的例子
  const useDy = useDynamicList(['小鱼', '岑岑']);
  const [form] = Form.useForm();

  const [resule, setResult] = useState('');
  const Row = (index: number, item: any) => (
    <div
      style={{ display: 'flex', alignItems: 'baseline' }}
      key={useDy.getKey(index)}
    >
      <div>
        <Form.Item
          rules={[{ required: true, message: 'required' }]}
          name={['id', useDy.getKey(index)]}
          initialValue={item}
        >
          <Input style={{ width: 300 }} placeholder="please input you name" />
        </Form.Item>
      </div>
      <div>
        {useDy.list.length > 1 && (
          <MinusCircleOutlined
            style={{ marginLeft: 8 }}
            onClick={() => useDy.remove(index)}
          />
        )}
        <PlusCircleOutlined
          style={{ marginLeft: 8 }}
          onClick={() => useDy.push('')}
        />
      </div>
    </div>
  );

  //useSelections:常见联动 checkbox 逻辑封装 例子
  const useUserList = useRequest(getUserList, {
    onSuccess: ({ list }) => {
      //设置那个元素被选中，也可以这样来用
      useUserSelection.setSelected([list[1]]);
    },
  });
  const useUserSelection = useSelections(
    useUserList?.data?.list ? useUserList?.data?.list : [],
    [],
  );

  const selectedStr = (selected: UserListItem[]) => {
    let ren: string = '';
    selected.forEach((user: UserListItem) => {
      ren = ren + ' ' + user.name;
    });
    return ren;
  };

  return (
    <Card>
      <Divider orientation="left" plain dashed>
        拖拽
      </Divider>
      <div id="a1" className={styles.drawer} {...drop1Props}>
        {drop1Hovering ? ' release here ' : 'drop here 1'}
      </div>

      <div id="a2" className={styles.drawer} {...drop2Props}>
        {drop2Hovering ? ' release here ' : 'drop here 1'}
      </div>
      <div
        style={{
          marginTop: 12,
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className={styles.box} {...getDragProps(`box1`)}>
          box1
        </div>
        <div className={styles.box} {...getDragProps(`box2`)}>
          box2
        </div>
        <a {...getDragProps(`a1`)}>你好呀</a>
      </div>
      <div>{dragging ? <>正在拖动:{dragging}</> : '没有拖动'}</div>

      <Divider orientation="left" plain dashed>
        useDynamicList:动态增加组件
      </Divider>
      <Form form={form}>{useDy.list.map((ele, index) => Row(index, ele))}</Form>

      <Button
        style={{ marginTop: 8 }}
        type="primary"
        onClick={() =>
          form
            .validateFields()
            .then((val) => {
              console.log(val);
              setResult(
                JSON.stringify(
                  (val || {}).id.filter((e: string) => {
                    console.log(!!e);
                    return !!e;
                  }),
                ),
              );
            })
            .catch(() => {})
        }
      >
        提交
      </Button>
      <div>{resule}</div>

      <Divider orientation="left" plain dashed>
        useSelections:常见联动 checkbox 逻辑封装
      </Divider>
      <em>
        支持多选，单选，全选逻辑，还提供了是否选择，是否全选，是否半选的状态。
      </em>
      <div style={{ marginTop: 20 }}></div>
      <div style={{ marginTop: 20 }}>
        <Checkbox
          checked={useUserSelection.allSelected}
          onClick={useUserSelection.toggleAll}
          indeterminate={useUserSelection.partiallySelected}
        >
          Check All
        </Checkbox>
        {'    '}[选中：{selectedStr(useUserSelection.selected)}]
      </div>

      <div style={{ marginTop: 20 }}>
        {useUserList.data?.list.map((user) => (
          <Checkbox
            checked={useUserSelection.isSelected(user)}
            onClick={() => useUserSelection.toggle(user)}
            key={user.id}
          >
            {user.name}
          </Checkbox>
        ))}
      </div>
    </Card>
  );
};
