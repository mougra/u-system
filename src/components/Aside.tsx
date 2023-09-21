import { Accordion } from 'react-bootstrap'
import '../styled/Aside.scss'
import Projecte from './Projecte'

function Aside() {
  return (
    <div className='aside'>
      <div className=''>
        <div className='aside-select'>
          <div className='select-content'>
            <div className='select-title'>Название проекта</div>
            <div className='select-subtitle'>Аббревиатура</div>
          </div>
          <div className='select-arrow'></div>
        </div>
        <div className='aside-navigation'>
          <Projecte text='Дашборд' link='/other' />
          <Accordion defaultActiveKey='0' flush>
            <Accordion.Item eventKey='1'>
              <Accordion.Header>CMDB</Accordion.Header>
              <Accordion.Body>
                <Projecte text='Серверы и ПК' link='/u-system/cmdb' />
                <Projecte text='Гипервизоры' link='/other' />
                <Projecte text='Принтеры' link='/other' />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Projecte text='Сеть' link='/other' />
          <Projecte text='Справочники' link='/other' />
          <Projecte text='Отчеты' link='/other' />
          <Projecte text='Мониторинг' link='/other' />
          <Projecte text='Автоматизация' link='/other' />
          <Projecte text='Администрирование' link='/other' />
        </div>
      </div>
    </div>
  )
}

export default Aside
