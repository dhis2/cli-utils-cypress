import { Menu } from '@dhis2/ui'

import { SidebarItem } from './SidebarItem'

export const Sidebar = () => (
    <Menu dataTest="dhis2-testingapp-sidebar">
        <SidebarItem
            exactMatch
            label="Section 1"
            path="/section1"
        />

        <SidebarItem
            exactMatch
            label="Section 2"
            path="/section2"
        />
    </Menu>
)
