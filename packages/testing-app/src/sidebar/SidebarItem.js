import { useHistory, useRouteMatch } from 'react-router-dom'
import { MenuItem } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import styles from './SidebarItem.module.css'

const useIsItemActive = (path, exact) => {
    const routeMatch = useRouteMatch(path)

    if (!routeMatch) return false
    if (exact) return routeMatch.isExact
    return true
}

export const SidebarItem = ({ label, path, exact, ...rest }) => {
    const history = useHistory()
    const active = useIsItemActive(path, exact)
    const navigateToPath = () => history.push(path)

    return (
        <MenuItem
            className={styles.item}
            onClick={navigateToPath}
            active={active}
            label={label}
            dataTest="dhis2-testingapp-sidebar-sidebaritem"
        />
    )
}

SidebarItem.defualtProps = {
    exact: false,
}

SidebarItem.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
}
