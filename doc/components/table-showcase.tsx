import { defineComponent } from 'vue'
import { LctBtn, LctCard, LctHeader, LctTable } from '../../lib'
import { ListItem } from './table-showcase.model'

const TableShowcase = defineComponent({
  setup () {
    const item = new ListItem()
    item.id = 1
    item.firstName = 'John'
    item.lastName = 'Smith'
    item.email = 'johnsmith@heaven.com'

    const items: ListItem[] = []
    items.push(item)

    const headers: LctHeader<ListItem>[] = [{
      text: 'id',
      value: 'id'
    }, {
      text: 'firstName',
      value: 'firstName',
      align: 'left'
    }, {
      text: 'lastName',
      value: 'lastName',
      width: 200,
      align: 'left'
    }, {
      text: 'email',
      value: 'email',
      align: 'left'
    }, {
      text: '操作',
      value: 'email'
    }]

    const slots = {
      header: (headers?: LctHeader<ListItem>[]) => {
        return (
          <tr>
            {headers?.map(value => (
              <th>{value.text}</th>))
            }
          </tr>
        )
      },
      items: (items?: ListItem) => {
        return (
          <tr>
            <td>{items?.id}</td>
            <td>{items?.firstName}</td>
            <td>{items?.lastName}</td>
            <td>{items?.email}</td>
            <td><LctBtn>操作</LctBtn></td>
          </tr>
        )
      }
    }

    return () => (
      <LctCard title='表格' elevated withMargin>
        <label>表格一</label>
        <LctTable items={items} headers={headers} style={'margin:20px 0'}/>
        <label>表格二</label>
        <LctTable items={items} headers={headers} v-slots={slots} style={'margin:20px 0'}/>
      </LctCard>
    )
  }
})

export {
  TableShowcase
}
