import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Modal = ({ showModal, content }: any) => {
  const container = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  }
  const backup = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 0.5,
    },
    exit: {
      opacity: 0,
    },
  }
  const modal = {
    initial: {
      scale: 1.2,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 1.2,
    },
  }
  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
          variants={container}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Background */}
          <div className="fixed inset-0">
            <motion.div
              className="absolute inset-0 bg-black"
              variants={backup}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          </div>
          {/* Modal */}
          <motion.div
            className="relative my-6 mx-auto w-full sm:w-11/12 xl:w-3/5"
            variants={modal}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* content */}
            <div>{content}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
