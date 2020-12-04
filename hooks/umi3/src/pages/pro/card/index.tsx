import React from 'react';
import { Card, Space, Statistic, Button, Steps } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { RightOutlined } from '@ant-design/icons';
const { Divider } = ProCard;
const { Step } = Steps;

export default () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [current, setCurrent] = React.useState(0);

  return (
    <>
      <PageContainer subTitle="ProCard例子">
        <Card
          title="Card"
          style={{ marginBottom: 16, width: 300 }}
          extra="exgra"
        >
          aaa
        </Card>

        <ProCard
          title="ProCard"
          style={{ marginBottom: 16, width: 300 }}
          tooltip="这是提示"
          extra="exgra"
        >
          <h1>何时使用</h1>
          <p>需要一个标准卡片容纳内容时。</p>
          <p>需要多个卡片栅格，gutter布局时。</p>
          <p>需要进行卡片内切分布局时。</p>
          <p>需要卡片可折叠时。</p>
        </ProCard>

        <ProCard
          style={{ marginBottom: 16 }}
          ghost
          direction="column"
          gutter={[0, 8]}
        >
          <ProCard layout="center">colSpan - 24</ProCard>

          <ProCard colSpan={12}>colSpan - 12</ProCard>
          <ProCard colSpan={8}>colSpan - 8</ProCard>
          <ProCard title="24栅格" gutter={8}>
            <ProCard colSpan={12} bordered layout="center">
              colSpan - 12
            </ProCard>
            <ProCard colSpan={6} bordered layout="center">
              colSpan - 6
            </ProCard>
            <ProCard colSpan={6} bordered layout="center">
              colSpan - 6
            </ProCard>
          </ProCard>

          <ProCard ghost gutter={8}>
            <ProCard layout="center" colSpan={'200px'}>
              conSpan-200px
            </ProCard>
            <ProCard layout="center">Auto</ProCard>
          </ProCard>

          <ProCard ghost gutter={8}>
            <ProCard layout="center">Auto</ProCard>
            <ProCard colSpan="30%" layout="center">
              {' '}
              colSpan - 30%
            </ProCard>
          </ProCard>
        </ProCard>

        <ProCard title="24栅格自适应" gutter={8}>
          <ProCard bordered colSpan={{ xs: 10, sm: 10, md: 3, lg: 10, xl: 2 }}>
            col1
          </ProCard>
          <ProCard bordered colSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 20 }}>
            col2
          </ProCard>
          <ProCard bordered colSpan={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 2 }}>
            col3
          </ProCard>
        </ProCard>

        <ProCard title="指定宽度px" gutter={8} style={{ marginTop: 8 }}>
          <ProCard
            bordered
            colSpan={{
              xs: '50px',
              sm: '100px',
              md: '200px',
              lg: '400px',
              xl: '400px',
            }}
            style={{ backgroundColor: 'pink' }}
          >
            col1 - px
          </ProCard>
          <ProCard bordered>auto</ProCard>
        </ProCard>

        <ProCard style={{ marginTop: 8 }} gutter={8} title="指定宽度百分比">
          <ProCard layout="center" bordered>
            Auto
          </ProCard>
          <ProCard
            layout="center"
            colSpan={{
              xs: '10%',
              sm: '20%',
              md: '40%',
              lg: '60%',
              xl: '80%',
            }}
            bordered
            style={{ backgroundColor: 'pink' }}
          >
            Col - 百分比
          </ProCard>
        </ProCard>

        {/* 分割 */}

        <ProCard
          style={{ marginTop: 18 }}
          title="左右分栏带标题"
          extra="2019年9月28日"
          headerBordered
          split="vertical"
        >
          <ProCard style={{}} colSpan="300px" title="左侧详情">
            left
          </ProCard>
          <ProCard title="流量占用情况">
            <div style={{ height: 250 }}>right</div>
          </ProCard>
        </ProCard>

        <ProCard
          style={{ marginTop: 18 }}
          title="复杂切分"
          extra="2019年9月28日"
          headerBordered
          split="vertical"
          bordered={true}
        >
          <ProCard colSpan="40%" split="horizontal">
            <ProCard split="vertical">
              <ProCard title="昨日全部流量">123</ProCard>
              <ProCard title="昨日全部流量">234</ProCard>
              <ProCard title="昨日全部流量">345</ProCard>
            </ProCard>
            <ProCard split="vertical">
              <ProCard title="运行中试验">12/56</ProCard>
              <ProCard title="历史试验总数">134 个</ProCard>
            </ProCard>
            <ProCard title="流量趋势">图表</ProCard>
          </ProCard>
          <ProCard title="流量占用情况">
            <div style={{ height: 450 }}>right</div>
          </ProCard>
        </ProCard>

        <ProCard.Group title="核心指标" style={{ marginTop: 18 }}>
          <ProCard>
            <Statistic title="今日UV" value={79.0} precision={2} />
          </ProCard>
          <Divider />
          <ProCard>
            <Statistic title="冻结金额" value={112893.0} precision={2} />
          </ProCard>
          <Divider />
          <ProCard>
            <Statistic title="信息完整度" value={93} suffix="/100" />
          </ProCard>
          <Divider />
          <ProCard>
            <Statistic title="冻结金额" value={112893.0} />
          </ProCard>
        </ProCard.Group>

        <ProCard.Group
          title="折叠"
          style={{ marginTop: 18 }}
          collapsible
          defaultCollapsed
        >
          <ProCard>
            <Statistic title="今日UV" value={79.0} precision={2} />
          </ProCard>
          <Divider />
          <ProCard>
            <Statistic title="冻结金额" value={112893.0} precision={2} />
          </ProCard>
          <Divider />
          <ProCard>
            <Statistic title="信息完整度" value={93} suffix="/100" />
          </ProCard>
          <Divider />
          <ProCard>
            <Statistic title="冻结金额" value={112893.0} />
          </ProCard>
        </ProCard.Group>

        <ProCard.Group
          title="折叠-右侧框"
          style={{ marginTop: 18 }}
          collapsed={collapsed}
          extra={
            <RightOutlined
              rotate={!collapsed ? 90 : undefined}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            />
          }
        >
          <ProCard>
            <Statistic title="今日UV" value={79.0} precision={2} />
          </ProCard>
          <Divider />
          <ProCard>
            <Statistic title="冻结金额" value={112893.0} precision={2} />
          </ProCard>
          <Divider />
          <ProCard>
            <Statistic title="信息完整度" value={93} suffix="/100" />
          </ProCard>
          <Divider />
          <ProCard>
            <Statistic title="冻结金额" value={112893.0} />
          </ProCard>
        </ProCard.Group>

        <ProCard style={{ marginTop: 18 }} tabs={{ tabPosition: 'left' }}>
          <ProCard.TabPane tab="tab1" key="tab1">
            内容1
          </ProCard.TabPane>
          <ProCard.TabPane tab="tab2" key="tab2">
            内容2
          </ProCard.TabPane>
        </ProCard>

        <ProCard
          title="横向内部卡片"
          bordered
          headerBordered
          style={{ marginTop: 18 }}
          gutter={16}
        >
          <ProCard title="内部卡片标题" type="inner" bordered>
            内部卡片内容
          </ProCard>
          <ProCard title="内部卡片标题" type="inner" bordered>
            内部卡片内容
          </ProCard>
        </ProCard>

        <ProCard style={{ marginTop: 18 }} split="vertical">
          <ProCard colSpan="25%">
            <Steps
              direction="vertical"
              size="small"
              style={{ maxHeight: 320 }}
              current={current}
            >
              <Step title="填写基本信息" />
              <Step title="配置模板" />
              <Step title="配置访问" />
              <Step title="配置部署和调度" />
              <Step title="预览" />
            </Steps>
          </ProCard>
          <ProCard title="流量占用情况">
            <Space>
              <Button
                type="primary"
                onClick={() => setCurrent(current + 1)}
                disabled={current === 5}
              >
                下一步
              </Button>
              <Button
                onClick={() => setCurrent(current - 1)}
                disabled={current === 0}
              >
                上一步
              </Button>
            </Space>
          </ProCard>
        </ProCard>
      </PageContainer>
    </>
  );
};
