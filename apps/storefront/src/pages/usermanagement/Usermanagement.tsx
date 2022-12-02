import {
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react'

import {
  Box,
} from '@mui/material'
import {
  B3Sping,
} from '@/components/spin/B3Sping'

import {
  getUsers,
  deleteUsers,
} from '@/shared/service/b2b'

import {
  GlobaledContext,
} from '@/shared/global'

import {
  Pagination,
  B3Table,
} from '@/components/table/B3Table'

import {
  B3Dialog,
} from '@/components'

import {
  snackbar,
} from '@/utils'

import {
  useMobile,
} from '@/hooks'

import {
  getFilterMoreList,
  UsersList,
  filterProps,
} from './config'

import B3AddEditUser from './AddEditUser'

import B3Filter from '../../components/filter/B3Filter'

import {
  UserItemCard,
} from './UserItemCard'

interface RefCurrntProps extends HTMLInputElement {
  handleOpenAddEditUserClick: (type: string, data?: UsersList) => void
}

interface RoleProps {
  role: string
}
interface UsersListProps {
  node: UsersList
}

const initPagination = {
  offset: 0,
  count: 0,
  first: 15,
}
const Usermanagement = () => {
  const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false)

  const [usersList, setUsersList] = useState<Array<UsersListProps>>([])

  const [pagination, setPagination] = useState<Pagination>(initPagination)

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

  const [userItem, setUserItem] = useState<UsersList>({
    createdAt: 0,
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    phone: '',
    role: 0,
    updatedAt: 0,
  })

  const [isMobile] = useMobile()

  const {
    state: {
      companyInfo,
      role,
      salesRepCompanyId,
    },
  } = useContext(GlobaledContext)

  const companyId = +role === 3 ? salesRepCompanyId : companyInfo?.id
  const isEnableBtnPermissions = role === 0 || role === 3

  const addEditUserRef = useRef<RefCurrntProps | null>(null)

  const customItem = {
    isEnabled: isEnableBtnPermissions,
    customLabel: 'add new user',
  }

  const initSearch = {
    first: 15,
    offset: 0,
    search: '',
    role: '',
    companyId,
  }

  const [filterSearch, setFilterSearch] = useState<Partial<filterProps>>(initSearch)

  const fetchList = async () => {
    try {
      setIsRequestLoading(true)
      const data = await getUsers(filterSearch)

      const {
        users: {
          edges,
          totalCount,
        },
      } = data

      if (isMobile) {
        const list = pagination.offset > 0 ? [...usersList, ...edges] : [...edges]
        setUsersList(list)
      } else {
        setUsersList(edges)
      }

      const ListPagination = {
        ...pagination,
      }

      ListPagination.count = totalCount

      setPagination(ListPagination)
    } finally {
      setIsRequestLoading(false)
    }
  }

  const initSearchList = () => {
    setFilterSearch({
      ...filterSearch,
      offset: 0,
    })
    setPagination({
      ...pagination,
      offset: 0,
    })
  }

  useEffect(() => {
    fetchList()
  }, [filterSearch])

  const fiterMoreInfo = getFilterMoreList()

  const handleChange = (key:string, value: string) => {
    const search = {
      ...filterSearch,
      q: value,
      offset: 0,
    }
    const listPagination = {
      ...pagination,
      offset: 0,
    }

    setPagination(listPagination)
    setFilterSearch(search)
  }

  const handleFirterChange = (value: RoleProps) => {
    const search = {
      ...filterSearch,
      role: value.role,
      offset: 0,
    }
    const listPagination = {
      ...pagination,
      offset: 0,
    }

    setPagination(listPagination)
    setFilterSearch(search)
  }

  const handleAddUserClick = () => {
    addEditUserRef.current?.handleOpenAddEditUserClick('add')
  }

  const handleEdit = (userInfo: UsersList) => {
    addEditUserRef.current?.handleOpenAddEditUserClick('edit', userInfo)
  }

  const handleDelete = (row: UsersList) => {
    setUserItem(row)
    setDeleteOpen(true)
  }

  const handlePaginationChange = (pagination: Pagination) => {
    const search = {
      ...filterSearch,
      first: pagination.first,
      offset: pagination.offset,
    }
    setFilterSearch(search)
    setPagination(pagination)
  }

  const handleCancelClick = () => {
    setDeleteOpen(false)
  }

  const handleDeleteUserClick = async (row: UsersList | undefined) => {
    if (!row) return
    try {
      setIsRequestLoading(true)
      handleCancelClick()
      await deleteUsers({
        userId: row.id || '',
        companyId,
      })
      snackbar.success('delete user successfully')
      fetchList()
    } finally {
      setIsRequestLoading(false)
    }
  }

  return (
    <B3Sping
      isSpinning={isRequestLoading}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <B3Filter
          fiterMoreInfo={fiterMoreInfo}
          handleChange={handleChange}
          handleFilterChange={handleFirterChange}
          customButtomConfig={customItem}
          handleFilterCustomButtomClick={handleAddUserClick}
        />
        <B3Table
          columnItems={[]}
          listItems={usersList}
          pagination={pagination}
          rowsPerPageOptions={[15, 30, 45]}
          onPaginationChange={handlePaginationChange}
          isCustomRender
          isInfiniteScroll={isMobile}
          isLoading={isRequestLoading}
          renderItem={(row: UsersList) => (
            <UserItemCard
              key={row.id || ''}
              item={row}
              isPermissions={isEnableBtnPermissions}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        />
        <B3AddEditUser
          companyId={companyId}
          renderList={initSearchList}
          ref={addEditUserRef}
        />
        <B3Dialog
          isOpen={deleteOpen}
          title="Delete user"
          leftSizeBtn="cancel"
          rightSizeBtn="delete"
          handleLeftClick={handleCancelClick}
          handRightClick={handleDeleteUserClick}
          row={userItem}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: `${isMobile ? 'center%' : 'start'}`,
              width: `${isMobile ? '100%' : '450px'}`,
              height: '100%',
            }}
          >
            Are you sure you want to delete this user?
          </Box>
        </B3Dialog>
      </Box>
    </B3Sping>
  )
}

export default Usermanagement