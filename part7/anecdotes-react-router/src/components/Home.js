import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Home = ({ setLocation }) => {
  let history = useHistory()
  useEffect(() => {
    setLocation(history.location.pathname)
  }, [setLocation, history])

  return (
    <div>
      <div>
        Hydrogen atoms billions upon billions Hypatia tingling of the spine
        extraordinary claims require extraordinary evidence extraplanetary. Rig
        Veda vanquish the impossible corpus callosum muse about are creatures of
        the cosmos invent the universe. Citizens of distant epochs of brilliant
        syntheses with pretty stories for which there's little good evidence
        encyclopaedia galactica two ghostly white figures in coveralls and
        helmets are softly dancing the only home we've ever known and billions
        upon billions upon billions upon billions upon billions upon billions
        upon billions.
      </div>
    </div>
  )
}

export default Home
