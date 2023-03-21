import React, {useRef, useState} from 'react';
import './App.css';
import { Button, Col, Row, FloatButton, Drawer, Typography,  Space, Tabs} from 'antd';
import { SettingOutlined, DownSquareOutlined } from '@ant-design/icons';
import { UiCards, UiProgressCharts, UiScoreCard, UiScoreBoards, UiCardColumnLinesChart, UiCardLinesChart, UiCardProgressLine, ChartsScoreChart, 
       ChartsScoreHeatMap, UiPdfButton, Comments, AntdTheme, GridComponents } from 'react-common-parcel'
import { stackedcolumnmutilinedata,  linesdata, Errorsdata} from './sampledata/chart/data'
import { componentList } from './sampledata/gridcomponents/componentlist'

import { appColor } from './color'

const {TabPane} = Tabs

const themeTexts = {
    'default': {
      titleText: 'Good day',
      buttonText: 'Change to default',
    },
    'light': {
      titleText: 'Good morning 🌤',
      buttonText: 'Change to dark',
    },
    'dark': {
      titleText: 'Good night 🌔',
      buttonText: 'Change to light',
    }
}
const { Title } = Typography

const colors = ['#E33488', '#1395BA']
const colors1 = ['#1395BA', '#A2B86C', '#EBC844']

const OnButtonClick = (e) => {  
    console.log("click")
}

export function App() {
    const appRef = useRef()
    const myTheme = useRef({})
    const [open, setOpen] = useState(false)
    const [curTheme, setTheme] = useState('default')

    const changeTheme1 = (themeType) => {
        myTheme.current.changeTheme(themeType)
        switch(themeType){
            case 1: 
                setTheme('default')
                break
            case 2: 
                setTheme('light')
                break
            case 3: 
                setTheme('dark')
                break
            default:
                setTheme('default')
                break
        }        
    }
    const showDrawer = () => {
      setOpen(true)
    }
  
    const onClose = () => {
      setOpen(false)
    }

    return(
        <>
        <AntdTheme ref={myTheme}>
        <Tabs defaultActiveKey='1' type='card' size={'small'}>
            <TabPane tab='screen1' key='1' style={{margin:0}}>
                <header style={{display:'flex', justifyContent: 'right', marginTop:'-16px', backgroundColor: appColor.componentBackground}}>
                    <Space wrap style={{marginTop:'20px'}}>
                        <Title style={{margin: 0, fontSize: '30px'}}>{themeTexts[curTheme].titleText}</Title>
                        <Button type="primary" onClick={e=>changeTheme1(1)}>{themeTexts['default'].buttonText}</Button>
                        <Button type="primary" onClick={e=>changeTheme1(2)}>{themeTexts['dark'].buttonText}</Button>
                        <Button type="primary" onClick={e=>changeTheme1(3)}>{themeTexts['light'].buttonText}</Button>
                        <Button icon={<SettingOutlined />} size="large" onClick={OnButtonClick}/>
                        <UiPdfButton pdfRef={appRef} pdfSavefile={'app-pdf-example.pdf'}/>
                    </Space>
                </header>
                <div ref={appRef} style={{backgroundColor: appColor.defaultBackground}}>
                    <Row gutter={[16, 16]} style={{height:'500px', marginTop: '10px'}}>
                        <Col span={24}>
                            <UiCardColumnLinesChart title='Overall DQ Score' value='60' svalue='-21' btnShow={false} data={stackedcolumnmutilinedata}/>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{height:'500px'}}>
                        <Col span={18}>
                            <UiCardLinesChart title='DQ Score by DQ Metrics' value='60' svalue='-21' btnShow={false} data={linesdata.uvCompletenessData} colors={colors} position='bottom'/>   
                        </Col>
                        <Col span={6}>
                            <UiScoreBoards title='Score Comparison' btnShow={false}/>                
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{height:'275px'}}>
                        <Col span={24}>
                            <ChartsScoreHeatMap title='DQ Score by DQ Metrics'/>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{height:'500px'}}>
                        <Col span={24}>
                            <UiCardLinesChart title='Error rate' btnShow={false} scoreShow={false} data={Errorsdata.uvMDMData} colors={colors1} position='right' pointfill='white'/>   
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{height:'650px'}}>
                        <Col span={24}>
                            <UiCardProgressLine title='Profiling' value='76' pointfill='white'/>
                        </Col>
                    </Row>
                </div> 
            </TabPane> 
            <TabPane tab='screen2' key='2' style={{margin:0}}>
                <GridComponents componentList={componentList} modalWidth={300}/>
            </TabPane>
            </Tabs>
            <FloatButton type='primary' onClick={showDrawer} />
            <Drawer title="Basic Drawer" placement="right" width={800} onClose={onClose} open={open}>
                <Comments dataurl={'./sampledata/commentdata.json'}/>
            </Drawer>            
        </AntdTheme>    
        </>      
    )
}
/*
npm install -D parcel-plugin-static-files-copy
// package.json
{
	...
    "staticFiles": {
        "staticPath": "public",
        "watcherGlob": "**"
    }
}
*/
export default App;
