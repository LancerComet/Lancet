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
      text: '操作'
    }]

    const slots = {
      items: (items?: ListItem) => {
        return (
          <tr>
            <td>{items?.id}</td>
            <td>{items?.firstName}</td>
            <td>{items?.lastName}</td>
            <td>{items?.email}</td>
            <td><LctBtn>Operation</LctBtn></td>
          </tr>
        )
      }
    }

    return () => (
      <LctCard title='表格' withMargin>
        <LctTable items={items} headers={headers} style={'margin:20px 0'} v-slots={slots} />
      </LctCard>
    )
  }
})

export {
  TableShowcase
}
